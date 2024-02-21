import http from "../http-common";

class DestinationDataService {
  getAll() {
    return http.get("/destinations");
  }

  get(id) {
    return http.get(`/destinations/${id}`);
  }

  create(data) {
    return http.post("/destinations", data);
  }

  update(id, data) {
    return http.put(`/destinations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/destinations/${id}`);
  }

  deleteAll() {
    return http.delete(`/destinations`);
  }

  findByTitle(title) {
    return http.get(`/destinations?title=${title}`);
  }

  updateTags(id, data) {
    return http.put(`/destinations/${id}/tags`, data);
  }
}

export default new DestinationDataService();