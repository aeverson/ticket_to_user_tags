(function() {

  return {

    requests: {
      addusertags: function(tags){
        return{
          url:  '/api/v2/users/' + this.ticket().requester().id() + '.json',
                dataType: 'json',
                contentType: 'application/json',
                data: '{"user": {"tags": "'+tags+'"}}',
                type: 'PUT'
        };
      },
    },

    events: {
      'ticket.save' : 'applytags'
    },

    applytags: function() {
      console.log("dsjkflsdjkl" +this.setting('tags'));
      var settingstags = this.setting('tags').split(" ");
      console.log(settingstags);
      console.log(this.ticket().tags());
      // the list of new tags starts with the tags the user already has (don't want to lose any)
      var newtaglist = this.ticket().requester().tags();
      //loop goes through each tag in the settings
      for (var i = settingstags.length - 1; i >= 0; i--) {
        //if this ticket contains a tag in the settings, and the user doesn't already have that tag
        if (this.ticket().tags().contains(settingstags[i]) && !this.ticket().requester().tags().contains(settingstags[i])) {
          console.log("adding tag " + settingstags[i] + " to user #" + this.ticket().requester().id());
          // add the tag in question to the list of tags to apply to the user
          newtaglist.push(settingstags[i]);
          var msg = 'Updated user ' + this.ticket().requester().name();
          this.ajax('addusertags',newtaglist).done(services.notify(msg));
        }
      }
    },
  };
}());
