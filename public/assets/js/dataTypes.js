function DataAPOD() {
    this.data = "";
    this.description = "";
    this.populate = function(data, descripton) {
        this.data = data;
        this.description = descripton;
        return this;
    }
}