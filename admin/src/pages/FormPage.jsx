function FormPage({ title }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
        <p className="card-category">Form controls will be connected in the next step.</p>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" placeholder="Enter name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Status</label>
              <select className="form-control">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-info btn-fill" type="button">
          Save
        </button>
      </div>
    </div>
  );
}

export default FormPage;
