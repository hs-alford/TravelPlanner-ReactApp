import http from "../http-common";

class TripDataService {
  getAll() {
    return http.get("/trips");
  }

  get(id) {
    return http.get(`/trips/${id}`);
  }

  create(data) {
    return http.post("/trips", data);
  }

  update(id, data) {
    return http.put(`/trips/${id}`, data);
  }

  delete(id) {
    return http.delete(`/trips/${id}`);
  }

  deleteAll() {
    return http.delete(`/trips`);
  }

  findByTitle(title) {
    return http.get(`/trips?title=${title}`);
  }

  updateTags(id, data) {
    return http.put(`/trips/${id}/tags`, data);
  }
}

export default new TripDataService();