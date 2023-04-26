class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.excludedFields = new Set(["field", "sort", "page", "limit"]);
  }

  filter() {
    //age=gt20_le20
    for (const field in this.queryString) {
      if (this.excludedFields.has(field)) continue;

      this.queryString[field].split("__").forEach((el) => {
        if (el.startsWith("gt"))
          this.query = this.query
            .where(field)
            .gt(el.split("-")[1].toLowerCase());

        if (el.startsWith("lt"))
          this.query = this.query
            .where(field)
            .lt(el.split("-")[1].toLowerCase());

        if (el.startsWith("ne"))
          this.query = this.query
            .where(field)
            .ne(el.split("-")[1].toLowerCase());

        if (el.startsWith("gte"))
          this.query = this.query
            .where(field)
            .gte(el.split("-")[1].toLowerCase());

        if (el.startsWith("lte"))
          this.query = this.query
            .where(field)
            .lte(el.split("-")[1].toLowerCase());

        if (el.startsWith("eq"))
          this.query = this.query
            .where(field)
            .equals(el.split("-")[1].toLowerCase());
      });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("__v");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 5000;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
