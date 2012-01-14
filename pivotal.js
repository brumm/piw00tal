
// pivotal.js
// brumm.github.com

(function($, fluid){

  // make current project the first one of the list
  $("#project_name_row ul li").click(function() {
    $("#project_name_row ul").prepend($(this));
  });
  // trigger once
  $("#project_name_row ul li.current").click();

  // set up panel menu items
  ["Current", "Backlog", "Icebox", "Done", "My Work"].each(function(panel) {
    fluid.addDockMenuItem(panel, function() {
      app.layout.togglePanel(Panel[panel.toUpperCase().replace(" ", "_")]);
    });    
  });

  // update dock badge
  setInterval(function() {
    fluid.dockBadge = $("#mywork .unstarted").length;
  }, 2000);

  // fluid.showGrowlNotification({
    // title: pivotal.project.name
    // description: "description", 
    // priority: 1, 
    // sticky: false,
    // identifier: "foo",
    // onclick: callbackFunc,
    // icon: imgEl // or URL string
  // });

})(jQuery, window.fluid);