const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
  name: {
    type: String
  }
},{
  versionKey:false
}
);

const Tag = model('Tag',TagSchema);

module.exports = Tag;
