import handle_json as HJ 
import bokeh_helper as BH 
import pandas as pd 

def get_name_mapping ( doctors , doc_dept) : 
	## common name dictionary , get name from doctor id 
	name_dict = {}
	for k in doc_dept :
		for name_id in doc_dept[k] : 
			name_dict[name_id] = doctors[name_id]["name"]
	return name_dict 

def create_tuples ( ailment_dept ) : 
	list_ail = [] 
	for dept_name in ailment_dept : 
		for ailment in ailment_dept[dept_name] : 
			list_ail.append( (dept_name , ailment) )
	return list_ail 

def ave_appointment ( ailment , appointments) : 
	total_apts = 0 
	diff_mins = 0 
	for k in appointments : 
		if appointments[k]["ailment"] == ailment :
			start_time = appointments[k]["intime"]
			stop_time = appointments[k]["outTime"]
			diff_mins = diff_mins + ( (stop_time - start_time).total_seconds() ) / 60 
			total_apts = total_apts + 1 
	return diff_mins/total_apts 


def ailment_appointment ( appointments, doctors ) : 
	
	ailment_dept , doc_dept = HJ.get_dept_info( doctors , appointments )
	doc_name_dict = get_name_mapping( doctors , doc_dept )
	## create tuple ( X - axis )
	ailment_dept_tuple = create_tuples ( ailment_dept )
	something = [ ave_appointment(i[1] , appointments ) for i in ailment_dept_tuple ] 
	BH.ailment_graph( ailment_dept_tuple , something )
	
	## Y - axis for the dif
	#BH.stacked_bar_plot ( x , " Ailment Wise Appointment Time " , y_list , color_list ) : 


def start_visualizations ( filename ) : 
	ptnt , apnt , doc = HJ.preprocessData ( filename )
	ailment_appointment ( apnt , doc )


start_visualizations ('data.json')
