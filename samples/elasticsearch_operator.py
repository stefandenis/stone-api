from elasticsearch_connector import ElasticsearchConnector


class ElasticsearchOperator:
    BACKOFF_INTERVAL = 10

    def __init__(self):
        self.handle = ElasticsearchConnector().connector

    def insert_document_with_id(self, index_name, id, document):
        self.handle.create(
            index=index_name,
            id=id,
            body=document
        )

    def insert_document(self, index_name, document):
        self.handle.index(index=index_name, body=document)
