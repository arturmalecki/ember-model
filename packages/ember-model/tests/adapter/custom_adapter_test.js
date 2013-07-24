var CustomModel;

module("Ember.CustomAdapter", {
  setup: function() {
    Ember.CustomAdapter = Ember.Adapter.extend();
    CustomModel = Ember.Model.extend({
      name: Ember.attr()
    });
    CustomModel.adapter = Ember.CustomAdapter.create();
  }
});

test("throws an error message with class name", function() {
  expect(1);

  throws(function() {
    Ember.run(CustomModel, CustomModel.find(1));
  }, /Ember.CustomAdapter must implement find/);
});

test("throws an error on hasMany relationship", function() {
  expect(1);

  var Post, Comment, record;

  Post = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr(),
    comments: Ember.hasMany("Comment")
  });
  Post.adapter = Ember.FixtureAdapter.create();
  Post.FIXTURES = [{id: 1, name: 'Comment'}];

  Comment = Ember.Model.extend({
    name: Ember.attr()
  });
  Comment.adapter = Ember.CustomAdapter.create();

  record = Ember.run(Post, Post.find, 1);
  stop();
  record.on('didLoad', function() {
    start();
    throws(function() {
      Ember.run(record, record.get, 'comments');
    }, /Ember.CustomAdapter must implement findAll/);
  });
});
