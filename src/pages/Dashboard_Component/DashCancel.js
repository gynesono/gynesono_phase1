

function DashCancel(props)
{
    return(
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <div className="dash-widget">
           <span className="dash-widget-bg3"><i class="fa fa-stethoscope" aria-hidden="true"></i></span>
              <div className="dash-widget-info text-right">
            <h3>{props.dashCancel}</h3>
            <span className="widget-title3">Canceled <i className="fa fa-check" aria-hidden="true"></i></span>
          </div>
        </div>
    </div>
    );
}

export default DashCancel;