var boite = {
  mois : ['janvier','février','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'],
  jours : ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
  ajoutZero : function(nombre){
      if(nombre < 10){
        nombre = '0' + nombre;
      }
      return nombre;
    }
};

exports.dateComplete = function(date) {
  var conversion = new Date(date);
  return (boite.jours[conversion.getDay()] + ' ' + conversion.getDate() + ' ' + boite.mois[conversion.getMonth()] + ' ' + conversion.getFullYear());
};

exports.dateCourte = function(date){
  var conversion = new Date(date);
  return (boite.ajoutZero(conversion.getDate()) + '/' + boite.ajoutZero(conversion.getMonth()) + '/' + conversion.getFullYear());
}

exports.heureComplete = function(date) {
  var conversion = new Date(date);
  return (boite.ajoutZero(conversion.getHours())+ 'h' + boite.ajoutZero(conversion.getMinutes()));
};

exports.heureLongue = function(date){
  var conversion = new Date(date);
  return (boite.ajoutZero(conversion.getHours())+ ':' + boite.ajoutZero(conversion.getMinutes()) + ':' +  boite.ajoutZero(conversion.getSeconds()));
}

exports.dateHeureCourte = function(date){
  return this.dateCourte(date) + ' - ' + this.heureComplete(date);
}

exports.dateHeure = function(date) {
  return this.dateComplete(date) + ' - ' + this.heureComplete(date);
}

exports.dateHeureLongue = function(date) {
  return this.dateComplete(date) + ' - ' + this.heureLongue(date);
}

exports.isAuthentified = function(req,res,next){
  if(req.session.identifiant) {
    res.status(403);
    next();
    return true;
  }
}

exports.isAnonymous = function(req,res,next,role){
  console.log(req.session.identifiant  + ' - ' +  req.session.role)
  if(!req.session.identifiant || req.session.role > role) {
    res.status(403);
    next();
    return true;
  }
}
