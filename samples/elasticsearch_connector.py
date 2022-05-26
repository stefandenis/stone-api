from elasticsearch import Elasticsearch
import ssl

class ElasticsearchConnector:

    def __init__(self):

        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        self.connector = Elasticsearch(
            hosts=["localhost"],
            port="9200",
            scheme="https",
            ssl_context=ssl_context,
            http_auth=("elastic", "elastic")
        )


