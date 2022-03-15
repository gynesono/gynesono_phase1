
function DashPending(props)
{
    return(

<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="dash-widget">
                        <span className="dash-widget-bg4"><i className="fa fa-tasks" aria-hidden="true"></i></span>
                        <div className="dash-widget-info text-right">
                            <h3>{props.dashPanding}</h3>
                            <span className="widget-title4">Pending <i className="fa fa-check" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
    );
}
export default DashPending;