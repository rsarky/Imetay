from bokeh.io import show , output_file 
from bokeh.models import ColumnDataSource, FactorRange
from bokeh.plotting import figure
from bokeh.core.properties import value

colors = ["#c9d9d3", "#718dbf", "#e84d60" , "#E52B50" , "#FFBF00" , "#7FFFD4" , "#C8A2C8"]


def ailment_graph ( x , counts ) : 
    
    output_file("ailment.html")
    source = ColumnDataSource(data=dict(x=x, counts=counts))
    p = figure(x_range=FactorRange(*x),plot_width=1000 ,  plot_height=500, title="Average Appointment Time",
               toolbar_location=None, tools="")

    p.vbar(x='x', top='counts', width=0.9, source=source)

    p.y_range.start = 0
    p.x_range.range_padding = 0.1
    p.xaxis.major_label_orientation = 1
    p.xgrid.grid_line_color = None
    p.yaxis.axis_label = "Minutes Taken"
    show(p)

def dept_patients ( dept_wise_data , xaxis_data , x_label, x_range = []) : 
#     # create a new plot
    if x_range == [] : 
        x_range = xaxis_data 
    p = figure(
       tools="pan,box_zoom,reset,save,xzoom_in,xzoom_out",
       title = "Department Wise Patient Influx" , x_axis_label=x_label, y_axis_label='Number of Patients' , plot_width = 1000
    )
    output_file(x_label + ".html")
    

    global colors 
    local_colors = colors[ : len(dept_wise_data)]

    
    ## iterate over the departments and create a unique graph for each of the departments 
    idx = 0 
    for dept_name in dept_wise_data : 
        p.line(xaxis_data, dept_wise_data[dept_name] , legend=dept_name )
        p.circle(xaxis_data, dept_wise_data[dept_name] , legend=dept_name, fill_color=local_colors[idx], size=8)
        idx = idx + 1
    show(p)

def doc_wise( dept_name , ailment_names , doctor_names , doc_time , name_map ) : 
    
    doc_time['ailment'] = ailment_names 
    global colors 
    local_colors = colors[ : len(doctor_names)]
    doc_names = []
    for k in doctor_names : 
        doc_names.append( name_map[k])
    
    #  ailment wise 
    output_file(dept_name + ".html")
    try : 
        p = figure(x_range=ailment_names, plot_width=1200 ,  plot_height=600, title="Average Appointment Time",
                   toolbar_location=None ,tools="hover", tooltips="$name @ailment: @$name mins")
        # , tools="hover", tooltips="$name @fruits: @$name"
        p.vbar_stack(doc_names, x='ailment', width=0.9, color=local_colors, source = doc_time , legend=[value(x) for x in doc_names])
        
        p.y_range.start = 0
        p.x_range.range_padding = 0.1
        p.xgrid.grid_line_color = None
        p.axis.minor_tick_line_color = None
        p.outline_line_color = None
        p.xaxis.axis_label = dept_name
        p.yaxis.axis_label = " In minutes"
        p.legend.location = "top_left"
        p.legend.orientation = "horizontal"
        show(p)

    except Exception as e:
        print ( " EXCEPTION occured ")
        print ( " Department" ,  dept_name )
        print ( " Doctors  " , doc_names )
        print ( " Ailments " , ailment_names )
        print ( " Colors " , local_colors )
        for k in doc_time : 
            print (" One sample doc time " ,  doc_time[k] )
            break 
        print ( e )