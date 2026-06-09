class CrudService {
   constructor(repository) {
        this.repository = repository;
    }

    async create(data) {
        return this.repository.create(data);
    }
    async getAll() {
        return this.repository.getAll();
    }
    async get(id) {
        return this.repository.get(id);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
    async update(data) {
        return this.repository.update(id,data);
    }
}

module.exports = CrudService