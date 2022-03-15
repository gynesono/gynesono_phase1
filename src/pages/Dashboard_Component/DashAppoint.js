import React from 'react';

function DashAppoint(props)
{
return (
        
        
            
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div className="dash-widget">
                        <span className="dash-widget-bg1"><i className="fa fa-briefcase" aria-hidden="true"></i></span>
                        <div className="dash-widget-info text-right">
                            <h3>{props.dashAppoint}</h3>
                            <span className="widget-title1">Appointment <i className="fa fa-check"
                                                                       aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
             
              
             
                
             );
            
        
        }

export default DashAppoint;