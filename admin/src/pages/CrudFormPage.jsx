import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function CrudFormPage({ resource }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState(() => getInitialData(resource.fields));
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(isEdit);
  const [uploadingField, setUploadingField] = useState("");

  const listPath = useMemo(() => resource.createPath.replace("/create", ""), [resource.createPath]);

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    const loadRecord = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`${resource.apiPath}/${id}`);
        setFormData(normalizeForForm(response.data.data, resource.fields));
      } catch (error) {
        setStatus({
          type: "danger",
          message: error.response?.data?.message || "Unable to load record",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [id, isEdit, resource.apiPath, resource.fields]);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field.name]: value,
    }));
  };

  const handleUpload = async (field, files) => {
    if (!files?.length) {
      return;
    }

    try {
      setUploadingField(field.name);
      setStatus({ type: "", message: "" });

      if (field.type === "media-list") {
        const uploadedUrls = [];

        for (const file of files) {
          uploadedUrls.push(await uploadFile(file, field.folder));
        }

        setFormData((current) => ({
          ...current,
          [field.name]: mergeMediaList(current[field.name], uploadedUrls),
        }));
        return;
      }

      const uploadedUrl = await uploadFile(files[0], field.folder);
      setFormData((current) => ({
        ...current,
        [field.name]: uploadedUrl,
      }));
    } catch (error) {
      setStatus({
        type: "danger",
        message: error.response?.data?.message || "Unable to upload image",
      });
    } finally {
      setUploadingField("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus({ type: "", message: "" });
      const payload = buildPayload(formData, resource.fields);

      if (isEdit) {
        await axiosInstance.put(`${resource.apiPath}/${id}`, payload);
      } else {
        await axiosInstance.post(resource.apiPath, payload);
      }

      navigate(listPath);
    } catch (error) {
      setStatus({
        type: "danger",
        message: formatApiMessage(error.response?.data?.message || "Unable to save record"),
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h4 className="card-title">
            {isEdit ? "Edit" : "Create"} {resource.title.slice(0, -1)}
          </h4>
          <p className="card-category">{isEdit ? "Update existing record" : "Add a new record"}</p>
        </div>
        <Link className="btn btn-outline-secondary" to={listPath}>
          Back
        </Link>
      </div>
      <div className="card-body">
        {status.message && <div className={`alert alert-${status.type}`}>{status.message}</div>}
        {loading ? (
          <div className="admin-empty">Loading record...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              {resource.fields.map((field) => (
                <div className={field.type === "textarea" ? "col-md-12" : "col-md-6"} key={field.name}>
                  <FieldInput
                    field={field}
                    uploading={uploadingField === field.name}
                    value={formData[field.name]}
                    onChange={(value) => handleChange(field, value)}
                    onUpload={(files) => handleUpload(field, files)}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-info btn-fill" type="submit">
              {isEdit ? "Update" : "Create"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FieldInput({ field, value, uploading, onChange, onUpload }) {
  if (field.type === "checkbox") {
    return (
      <div className="form-group admin-checkbox-field">
        <label>
          <input checked={Boolean(value)} type="checkbox" onChange={(event) => onChange(event.target.checked)} />{" "}
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <textarea
          className="form-control"
          placeholder={field.placeholder || field.label}
          required={field.required}
          rows="4"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <select
          className="form-control"
          required={field.required}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        >
          {(field.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "media") {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <MediaPreview value={value} />
        <input
          accept="image/*"
          className="form-control admin-file-input"
          required={field.required && !value}
          type="file"
          onChange={(event) => onUpload(event.target.files)}
        />
        <input
          className="form-control mt-2"
          placeholder="/uploads/products/image.jpg"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        />
        {uploading && <small className="text-info">Uploading...</small>}
      </div>
    );
  }

  if (field.type === "media-list") {
    const items = parseMediaList(value);

    return (
      <div className="form-group">
        <label>{field.label}</label>
        {items.length > 0 && (
          <div className="admin-media-grid">
            {items.map((item) => (
              <div className="admin-media-tile" key={item}>
                <img alt="" src={getMediaUrl(item)} />
                <button
                  className="btn btn-sm btn-danger"
                  type="button"
                  onClick={() => onChange(items.filter((currentItem) => currentItem !== item).join(", "))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          accept="image/*"
          className="form-control admin-file-input"
          multiple
          type="file"
          onChange={(event) => onUpload(event.target.files)}
        />
        <input
          className="form-control mt-2"
          placeholder="/uploads/products/1.jpg, /uploads/products/2.jpg"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        />
        {uploading && <small className="text-info">Uploading...</small>}
      </div>
    );
  }

  return (
    <div className="form-group">
      <label>{field.label}</label>
      <input
        className="form-control"
        placeholder={field.placeholder || field.label}
        required={field.required}
        type={field.type === "tags" ? "text" : field.type}
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function getInitialData(fields) {
  return fields.reduce((data, field) => {
    data[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
    return data;
  }, {});
}

function normalizeForForm(record, fields) {
  const initialData = getInitialData(fields);

  fields.forEach((field) => {
    const value = record?.[field.name];

    if (field.type === "tags" || field.type === "media-list") {
      initialData[field.name] = Array.isArray(value) ? value.join(", ") : value || "";
      return;
    }

    if (field.type === "datetime-local" && value) {
      initialData[field.name] = value.slice(0, 16);
      return;
    }

    initialData[field.name] = value ?? initialData[field.name];
  });

  return initialData;
}

function buildPayload(formData, fields) {
  const payload = {};

  fields.forEach((field) => {
    const value = formData[field.name];

    if (field.type === "tags" || field.type === "media-list") {
      payload[field.name] = String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      return;
    }

    if (field.type === "number") {
      payload[field.name] = value === "" ? undefined : Number(value);
      return;
    }

    if (field.type === "datetime-local") {
      payload[field.name] = value ? new Date(value).toISOString() : undefined;
      return;
    }

    payload[field.name] = value;
  });

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
}

function formatApiMessage(message) {
  return Array.isArray(message) ? message.join(", ") : message;
}

async function uploadFile(file, folder) {
  const data = new FormData();
  data.append("folder", folder || "general");
  data.append("image", file);

  const response = await axiosInstance.post("/uploads/admin", data);
  return response.data.data.url;
}

function mergeMediaList(currentValue, uploadedUrls) {
  return [...parseMediaList(currentValue), ...uploadedUrls].join(", ");
}

function parseMediaList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function MediaPreview({ value }) {
  if (!value) {
    return <div className="admin-media-placeholder">No image selected</div>;
  }

  return (
    <div className="admin-media-preview">
      <img alt="" src={getMediaUrl(value)} />
    </div>
  );
}

function getMediaUrl(value) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http") || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("/uploads")) {
    return `${getApiOrigin()}${value}`;
  }

  return value;
}

function getApiOrigin() {
  const baseUrl = axiosInstance.defaults.baseURL || "http://localhost:5000/api";
  return baseUrl.replace(/\/api\/?$/, "");
}

export default CrudFormPage;
