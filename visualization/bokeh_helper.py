# from bokeh.plotting import figure, output_file, show
# from bokeh.palettes
# from bokeh.transform import factor_cmap

# def line_plot() : 
    
#     """ 
#         x : x axis value ( time stamps )
#         list_y : different values that we want to be displayed parallely 
#     """ 


#     # create a new plot
#     p = figure(
#        tools="pan,box_zoom,reset,save,xzoom_in,xzoom_out",
#        title = "" , x_axis_label='Day-Time', y_axis_label='Time Stamp'
#     )

#     # add some renderers
#     # p.line(x, x, legend="y=x")
#     # p.circle(x, x, legend="y=x", fill_color="white", size=8)
    
#     # p.line(x, y0, legend="y=x^2", line_width=3)
    
#     # p.line(x, y1, legend="y=10^x", line_color="red")
    
#     # p.circle(x, y1, legend="y=10^x", fill_color="red", line_color="red", size=6)

#     # p.line(x, y2, legend="y=10^x^2", line_color="orange", line_dash="4 4")
#     return p 


from bokeh.io import show , output_file 
from bokeh.models import ColumnDataSource, FactorRange
from bokeh.plotting import figure
from bokeh.core.properties import value

colors = ["#c9d9d3", "#718dbf", "#e84d60" , "#E52B50" , "#FFBF00" , "#7FFFD4" , "#C8A2C8"]


def ailment_graph ( x , counts ) : 
    
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