# from bokeh.plotting import figure, output_file, show
# from bokeh.palettes
# from bokeh.transform import factor_cmap

# def line_plot() : 
    
#     """ 
#         x : x axis value ( time stamps )
#         list_y : different values that we want to be displayed parallely 
#     """ 

#     x = [0.1, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
#     y0 = [i**2 for i in x]
#     y1 = [10**i for i in x]
#     y2 = [10**(i**2) for i in x]

#     # output to static HTML file
#     output_file("log_lines.html")

#     # create a new plot
#     p = figure(
#        tools="pan,box_zoom,reset,save,yzoom_in,yzoom_out",
#        title = "" , x_axis_label='sections', y_axis_label='Time Stamp'
#     )

#     # add some renderers
#     # p.line(x, x, legend="y=x")
#     # p.circle(x, x, legend="y=x", fill_color="white", size=8)
    
#     # p.line(x, y0, legend="y=x^2", line_width=3)
    
#     # p.line(x, y1, legend="y=10^x", line_color="red")
    
#     # p.circle(x, y1, legend="y=10^x", fill_color="red", line_color="red", size=6)

#     # p.line(x, y2, legend="y=10^x^2", line_color="orange", line_dash="4 4")
#     return p 


from bokeh.io import show
from bokeh.models import ColumnDataSource, FactorRange
from bokeh.plotting import figure
from bokeh.core.properties import value



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

def doc_wise( dept_name , ailment_names , doctor_names ) : 
    
    
    colors = ["#c9d9d3", "#718dbf", "#e84d60"] ## as big as doctor

    doctor_ailment_times['ailment'] = ailment_names 
            
    ##  ailment wise 
    p = figure(x_range=ailment_names, plot_height=250, title="Average Appointment Time",
               toolbar_location=None, tools="hover", tooltips="$name @fruits: @$name")

    p.vbar_stack('doctor_names', x='ailment', width=0.9, color=colors, source = data ,
                 legend=[value(x) for x in ailments])

    p.y_range.start = 0
    p.x_range.range_padding = 0.1
    p.xgrid.grid_line_color = None
    p.axis.minor_tick_line_color = None
    p.outline_line_color = None
    p.legend.location = "top_left"
    p.legend.orientation = "horizontal"
    p.xaxis.axis_label = dept_name
    show(p)        