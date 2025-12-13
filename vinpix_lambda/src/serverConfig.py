from .utils import *

def getConfig():
    return {
            'statusCode': 200,
            'body': {
                'allwayUpdateHistory': True,
                'numOfEdit': 2,
                'cooldownEdit': 400,
                'addCredit': 2,
                'k': k,
                'exampleDataFile': 'exampleDataFile.json',
                'translationFile': 'translationFile.csv',
                'ios':{
                    'forceUpdate': False,
                    'version': '1.0.0',
                    'bundle': 1,
                   
                },
                'android':{
                    'forceUpdate': False,
                    'version': '1.0.0',
                    'bundle': 1,
                  
                },
            }
        }
    
