from elasticsearch_operator import ElasticsearchOperator
import os
import yaml


class PopulateQuestions:

    def __init__(self):
        self.operator = ElasticsearchOperator()

    def start_population(self):
        failures = 0
        with open("stones.yaml") as file:
            stones = yaml.load(file, Loader=yaml.FullLoader)

        for image_name, image_metadata in stones.items():
            image_path = "/public/images/" + image_name + "." + image_metadata.get("image_extension")
            res = self.operator.insert_document(
                index_name="stones",
                document=({"image_path": image_path, "stone_name": image_metadata.get("name")})
                )
            if res is not None:
                failures += 1

        print(failures)


if __name__ == "__main__":
    PopulateQuestions().start_population()
