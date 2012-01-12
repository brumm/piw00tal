window.fluid.dockBadge = '';
setInterval(updateDockBadge, 2000);

function updateDockBadge() {
	var newBadge = '';

  var unstarted = document.getElementsByClassName('unstarted');

	window.fluid.dockBadge = unstarted.length;
}
