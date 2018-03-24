/**
 * Book model events
 */

'use strict';

import {EventEmitter} from 'events';
var BookEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Book) {
  for(var e in events) {
    let event = events[e];
    Book.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    BookEvents.emit(event + ':' + doc._id, doc);
    BookEvents.emit(event, doc);
  };
}

export {registerEvents};
export default BookEvents;
