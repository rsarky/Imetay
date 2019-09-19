import json 
from datetime import datetime

def getDataFromFile ( filename ) : 
	## get data from json file , returns a dictionary 
	with open( filename , 'rb' ) as dfile : 
		data = json.load ( dfile )
	return data 

def analyzeDict ( someDict ) : 
	## get the params in each of doctor / patient / appointment 
	for k1 in someDict : 
		for query in someDict[k1] : 
			print (  type ( someDict[k1][query] ) , someDict[k1][query] ,  query )
		break 

def correctWaitingTime ( inputDict ) : 
	## strip off the extra information in the end , and convert waiting time to float 
	for k in inputDict : 
		temp = inputDict[k]["waitingTime"]
		inputDict[k]["waitingTime"] = float (  temp.strip("hrs")  )
	return inputDict 

def correctTime ( inputDict ) : 
	## convert string to a date time object , return the dictionary 
	keys = [ "appointmentTime" , "intime" , "outTime" ]
	for dateKey in keys : 
		for k in inputDict : 
			temp = inputDict[k][dateKey]
			dateTimeObj = datetime.strptime(temp, '%d/%m/%Y %H:%M')
			inputDict[k][dateKey] = dateTimeObj
	return inputDict
		

def get_departments ( doctors ) : 

	dept_list = [] 
	for k in doctors : 
		dept_list.append( doctors[k]["department"] ) 
	return list ( set ( dept_list ) ) 

def get_doctor_list ( doctors , dept_name ) : 

	doc_list = [] 
	for k in doctors : 
		if doctors[k]["department"] == dept_name : 
			doc_list.append ( k ) 
	return list(set( doc_list ) ) 

def get_ailments (appointments, doc_list ) : 

	ailment_list = []

	for k in appointments : 
		if appointments[k]["doctorUID"] in doc_list : 
			ailment_list.append ( appointments[k]["ailment"]) 

	return list ( set ( ailment_list ) ) 

def get_dept_info ( doctors , appointments ) : 

	ailment_dept = {} 
	doc_dept = {}
	## get list of departments 
	dept_list = get_departments(doctors)
	## ailment per department
	for dept_name in dept_list : 
		
		doc_dept[dept_name] = get_doctor_list ( doctors , dept_name )
		ailment_dept [ dept_name ] = get_ailments ( appointments , doc_dept[dept_name] )

	return ailment_dept , doc_dept

def preprocessData( filename ) : 
	
	## entry point for the script to run 
	data = getDataFromFile ( filename )
	
	## make 3 different dictionaries for better handling of data 
	patients = data['patients']
	appointments = data['appointments']
	doctors = data['users']

	appointments = correctWaitingTime ( appointments )
	appointments = correctTime ( appointments )
	
	return  patients , appointments , doctors 