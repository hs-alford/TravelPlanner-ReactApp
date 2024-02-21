module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        budget: Number,
        startdate: Date,
        enddate: Date,
        tags: [{
          name: {
            type: String,
            required: true
          }
        }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Trip = mongoose.model("trip", schema);
    return Trip;
  };
  