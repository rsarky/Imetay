from flask import Flask
import visualization as VZ
import handle_json as HJ 
import bokeh_helper as BH
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/<string:page_name>')
def render_page(page_name) : 
	f = open(page_name + ".html") 
	fk = f.read() 
	f.close() 
	return fk 


if __name__ == '__main__':
	possible_graphs = [ "ailment" , "week" , "day" ]
	_ , _ , d = HJ.preprocessData( "data.json" )
	dept_names = HJ.get_departments ( d )
	possible_graphs.extend(dept_names)
	possible_graphs = [ BH.cleanup(s) for s in possible_graphs ] 
	print ( possible_graphs )
	VZ.start_visualizations ( "data.json" )
	app.run(debug=True)