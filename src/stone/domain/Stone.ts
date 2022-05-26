export class Stone {
  id: string;
  image_path: string;
  stone_name: string;

  setId(id) {
    this.id = id;
    return this;
  }

  setImagePath(image_path) {
    this.image_path = image_path;
    return this;
  }

  setStoneName(stone_name) {
    this.stone_name = stone_name;
    return this;
  }
}
