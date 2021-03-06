/*global $*/

// Object.values shim
if (Object.values === undefined) {
    Object.values = function(obj) {
        var keys = Object.keys(obj),
            length = keys.length,
            values = Array(length);
        for (var i=0; i<length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };
}


function add_events(target, event_list) {
    // Event system
    var events = {};
    event_list.forEach(function(event) {
        events[event] = $.Callbacks();
    });
    target.prototype.publish = function(event, data) {
        events[event].fire(data);
    };
    target.prototype.subscribe = function(event, callback) {
        events[event].add(callback);
    };
    target.prototype.unsubscribe = function(event, callback) {
        events[event].remove(callback);
    };
}


function nice_duration_seconds(seconds) {
    return (Math.floor(seconds * 100) / 100.0) + 's';
}


function linkify(type, id) {
    return `<a href="#" data-type="${type}" data-id="${id}" class="view_link">${id}</a>`;
}

// Adapted from http://stackoverflow.com/questions/26057572/string-to-unique-hash-in-javascript-jquery
function generate_id(str) {
    var hash = 3141592;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return window.btoa(hash).substr(0, 7);
}
