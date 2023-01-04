

function SearchPageHeader(){

    return (<>
         <header className="row">
      <div className="col-12 bg-danger p-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p className="m-0 logo d-flex justify-content-center align-items-center fw-bold fs-4">
            e!
          </p>
          <div>
            <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#login">Login</button>
            <button className="btn btn-outline-light">Create An account</button>
          </div>
        </div>
      </div>
    </header>
    </>);
}

export default SearchPageHeader;