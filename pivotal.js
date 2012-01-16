
var proxy = function(fn, callback) {
  return function() {
    callback.call(arguments);
    return fn.apply(this, arguments);
  };
};

// pivotal.js
// brumm.github.com

(function($, fluid){

  // make current project the first one of the list
  $("#project_name_row ul li").click(function() {
    $("#project_name_row ul").prepend($(this));
  });
  // trigger once
  $("#project_name_row ul li.current").click();

  // set up dock menu items
  ["Current", "Backlog", "Icebox", "Done", "My Work"].each(function(panel) {
    fluid.addDockMenuItem(panel, function() {
      app.layout.togglePanel(Panel[panel.toUpperCase().replace(" ", "_")]);
    });    
  });

  // update dock badge
  setInterval(function() {
    fluid.dockBadge = $("#mywork .unstarted").length || null;
  }, 2000);

  var interval = setInterval(function() {
    if (typeof window.app.project.commandQueue.onServerStale === "function") {
      // wrap function in our proxy to intercept calls
      window.app.project.commandQueue.onServerStale = proxy(window.app.project.commandQueue.onServerStale, function() {
        var responseJson = this[0];
        if (responseJson.status == "STALE") {
          for (var i = responseJson.commands.length - 1; i >= 0; i--) {
            var cmd = responseJson.commands[i];
            console.log(cmd);
            console.log(cmd.parameters.story.name);
            console.log(cmd.description.subject + cmd.description.verb + cmd.description.object_phrase);
            fluid.showGrowlNotification({
              title: cmd.parameters.story.name,
              description: cmd.description.subject + " " +  cmd.description.verb + " " + cmd.description.object_phrase,
              // priority: 1, 
              // sticky: false,
              // identifier: "foo",
              onclick: function() {
                var story = app.project.getStoryById(cmd.parameters.story.id);
                app.layout.revealItem(story);
              },
              // icon: imgEl // or URL string
            })
          };
        };
      });
    };
    clearInterval(interval);
  }, "1000");

})(jQuery, window.fluid);