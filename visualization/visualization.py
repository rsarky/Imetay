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


def get_ailment_wise_time (appointments, doc_list, name_map , ailment_list ) : 

	doc_ailment_times = {} 
	doc_ailment_temp = {} 
	for d in doc_list : 
		doc_ailment_times[ name_map[d] ] = [0 for i in ailment_list]
		doc_ailment_temp[ name_map[d] ] = [0 for i in ailment_list]

	for k in appointments : 
		## for doctors in the list 
		if appointments[k]["doctorUID"] in doc_list :
			## find index of the ailment 
			idx = ailment_list.index ( appointments[k]["ailment"] ) 
			## find time for the appointment
			start_time = appointments[k]["intime"]
			stop_time = appointments[k]["outTime"]
			## at that index , increment the average appointment time 
			some_val = doc_ailment_times[ name_map[appointments[k]["doctorUID"]] ][idx] 
			some_val = some_val + ( (stop_time - start_time).total_seconds() ) / 60 
			doc_ailment_times[ name_map[appointments[k]["doctorUID"]] ][idx] = some_val
			## increment total appointments till now 
			doc_ailment_temp[name_map[appointments[k]["doctorUID"]] ][idx] = doc_ailment_temp[name_map[appointments[k]["doctorUID"]] ][idx] + 1 
	
	## take the average from the total computed 
	for doc_name in doc_ailment_times : 
		for i in range(len(ailment_list)) : 
			doc_ailment_times[doc_name][i] = doc_ailment_times[doc_name][i] / doc_ailment_temp[doc_name][i]
	
	return doc_ailment_times


def get_appointment_times ( appointments , doctors , name_map , dept_name ) : 
	""" Get average appointment time per ailment per doctor """
	doctors_list = HJ.get_doctor_list ( doctors , dept_name )
	ailment_list = HJ.get_ailments ( appointments , doctors_list )
	doc_ailment_wise = get_ailment_wise_time ( appointments , doctors_list , name_map , ailment_list )

	return doc_ailment_wise , doctors_list , ailment_list 


def plot_appointment ( appointments, doctors ) : 	
	""" Plot graphs for appointment times  """
	ailment_dept , doc_dept = HJ.get_dept_info( doctors , appointments )
	name_map = get_name_mapping( doctors , doc_dept )

	## first graph : basic 	
	# ailment_dept_tuple = create_tuples ( ailment_dept )
	# something = [ ave_appointment(i[1] , appointments ) for i in ailment_dept_tuple ] 
	# BH.ailment_graph( ailment_dept_tuple , something )
	
	## second graph : 
	for dept_name in ailment_dept :
		doctor_ailment_times , doctor_names , ailment_names = get_appointment_times( appointments , doctors , name_map , dept_name )
		BH.doc_wise( dept_name , ailment_names , doctor_names , doctor_ailment_times , name_map )

def start_visualizations ( filename ) : 
	ptnt , apnt , doc = HJ.preprocessData ( filename )
	plot_appointment ( apnt , doc )


start_visualizations ('Final.json')
