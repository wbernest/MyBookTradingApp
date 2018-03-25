'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './book.events';

var BookSchema = new mongoose.Schema({
  name: String,
  img: String,
  ownerid: String,
  owner: String,
  readerid: String,
  reader: String,
  approved: Boolean
});

registerEvents(BookSchema);
export default mongoose.model('Book', BookSchema);
