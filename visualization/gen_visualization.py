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
		

def startVisualization( filename ) : 
	
	## entry point for the script to run 
	data = getDataFromFile ( filename )
	
	## make 3 different dictionaries for better handling of data 
	patients = data['patients']
	appointments = data['appointments']
	doctors = data['users']

	appointments = correctWaitingTime ( appointments )
	appointments = correctTime ( appointments )
	
	analyzeDict(appointments)


## for appointments, doctors -> everything is in string | patient only name is via string | phone number and noShows ## 
## doctor ->  dept |  First Name ; patients -> noShows | name ; appointments -> ailment | appointment | docID | patID | wait time 

## function to start the python script 
startVisualization('data.json')