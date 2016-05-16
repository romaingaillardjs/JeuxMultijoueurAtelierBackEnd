

var tableaudesConnexions = [],
    tableaudesPersonnage = [],
    tableaudesMurs = [],
    tableaudesProjectiles = [],
    randomy,
    randomx,
    depart,
    o1,
    o2,
    m1,
    m2,
    sensX,
    sensY,
    htm,
    i = 10,
    j = 10,
    score = 0;
  var Personnage = function(id, x, y, height, width)
  {
    this.id = id;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.collision = 0;
  }
  var projectile = function(id, x, y, height, width, sensX, sensY)
  {
    this.id = id;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.sensX = sensX;
    this.sensY = sensY;
  }
  var Murs2 = function(id, x, y, height, width)
  {
    this.id = id;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.class = "murs2";
    this.murs = 'horizontal';
  }
  var Murs3 = function(id, x, y, height, width)
  {
    this.id = id;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.class = "murs3";
    this.murs = 'vertical';
  }
  var Murs4 = function(id, x, y, height, width)
  {
    this.id = id;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.class = "murs4";
  }
  exports.creerProjectile = function(data)
  {
    console.log('creerProjectile')
    if (tableaudesProjectiles.length>10) 
      {
        tableaudesProjectiles = tableaudesProjectiles.splice(5,10);
      };
      tableaudesProjectiles.push(new projectile('newprojectile' + tableaudesProjectiles.length, data.x, data.y, 10, 10, data.sensX, data.sensY));
  };
  var creerPersonnage = function(id)
  {
    tableaudesPersonnage.push(new Personnage('page' + tableaudesPersonnage.length, 10, 10, 10, 10))
  };
  // fonction constructeur du tableau des fruits
  var creerMurs = function(largeurtotal, hauteurtotal, toptotal, lefttotal)
  {
    var l = 0
    for (var i = 1; i < 6; i = i + 2)
    {
      for (var n = 1; n < 6; n = n + 2)
      {
        taille = 0.15;
        var positionX = parseInt(largeurtotal * (taille * n) + lefttotal);
        var positionY = parseInt(hauteurtotal * (taille * i) + toptotal);
        var hauteur = 5;
        var largeur = largeurtotal * taille;
        tableaudesMurs.push(new Murs2('murs' + n + l, positionX, positionY, hauteur, largeur));
        var positionX = parseInt(largeurtotal * (taille * n) + lefttotal);
        var positionY = parseInt(hauteur * (taille * i) + toptotal);
        var hauteur = hauteurtotal * taille;
        var largeur = largeurtotal * taille;
        tableaudesMurs.push(new Murs4('murs4' + n + l, positionX, positionY, hauteur, largeur));
        l++;
        var positionX = parseInt(largeurtotal * (taille * n) + lefttotal);
        var positionY = parseInt(hauteurtotal * (taille * i) + (hauteurtotal * taille) + toptotal);
        var hauteur = 5;
        var largeur = largeurtotal * taille;
        tableaudesMurs.push(new Murs2('murs' + n + l, positionX, positionY, hauteur, largeur));
        l++;
        var positionX = parseInt(largeurtotal * (taille * n) + lefttotal);
        var positionY = parseInt(hauteurtotal * (taille * i) + toptotal);
        var hauteur = 5;
        var largeur = largeurtotal * taille;
        tableaudesMurs.push(new Murs3('murs' + n + l, positionX, positionY, largeur, hauteur));
        l++;
        var positionX = parseInt(largeurtotal * (taille * n) + (largeurtotal * taille) + lefttotal);
        var positionY = parseInt(hauteurtotal * (taille * i) + toptotal);
        var hauteur = 5;
        var largeur = largeurtotal * taille;
        tableaudesMurs.push(new Murs3('murs' + n + l, positionX, positionY, largeur, hauteur));
        l++;
      }
    }
  };
  var collisionMurs2 = function(m1, m2)
  {
    var rect1 = {
      x: m1.x,
      y: m1.y,
      width: m1.width,
      height: m1.height
    }
    var rect2 = {
      x: m2.x,
      y: m2.y,
      width: m2.width,
      height: m2.height
    }
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y)
    {
      var test = m2.murs;
      if (test == 'vertical')
      {
        m1.sensX = -m1.sensX;
      }
      if (test == 'horizontal')
      {
        m1.sensY = -m1.sensY;
      }
    }
  };
  var testcollisiondesMursPersonnage = function()
  {
    for (var e = 0; e < tableaudesPersonnage.length; e++)
    {
      m1 = tableaudesPersonnage[e];
      for (var k = 0; k < tableaudesMurs.length; k++)
      {
        m2 = tableaudesMurs[k];
        var rect1 = {
          x: m1.x,
          y: m1.y,
          width: 10,
          height: 10
        }
        var rect2 = {
          x: m2.x,
          y: m2.y,
          width: m2.width,
          height: m2.height
        }
        if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y)
        {
          var test = m2.murs;
          if (test == 'vertical')
          {
            return true
          }
          if (test == 'horizontal')
          {
            return true
          }
        }
      }
    }
  };
  var testcollisionprojectileMurs = function()
  {
    for (var i = 0; i < tableaudesProjectiles.length; i++)
    {
      p = tableaudesProjectiles[i];
      for (var j = 0; j < tableaudesMurs.length; j++)
      {
        o = tableaudesMurs[j];
        x1 = p.x;
        y1 = p.y;
        x2 = o.x;
        y2 = o.y;
        var rect1 = {
          x: x1,
          y: y1,
          width: 10,
          height: 10
        };
        var rect2 = {
          x: x2,
          y: y2,
          width: o.width,
          height: o.height
        };
        if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y)
        {
          console.log('collision détectée !');
          p.stop()
          tableaudesProjectiles.shift();
        }
      }
    }
  };
  var bougerProjectile = function()
  {
    for (var i = 0; i < tableaudesProjectiles.length; i++)
    {
      p = tableaudesProjectiles[i];
      p.x = p.x + p.sensX;
      p.y = p.y + p.sensY;
      // var monx = p.x
      // var mony = p.y
      // document.getElementById('newprojectile').style.left = monx + 'px';
      // document.getElementById('newprojectile').style.top = mony + 'px';
    }
  };
  // var affichelescore = function() {
  //     document.getElementById('score').innerHTML = score;
  // }
  var main = function(largeurtotal, hauteurtotal, toptotal, lefttotal)
  {
    setInterval(function()
    {
      bougerProjectile();
       exports.totaldata = [tableaudesMurs, tableaudesPersonnage, tableaudesProjectiles];
      //testcollisionprojectileMurs();
    }, 10)
  };
  exports.Jeux = function(largeurtotal, hauteurtotal, toptotal, lefttotal, id)
  {
    creerMurs(largeurtotal, hauteurtotal, toptotal, lefttotal);
    creerPersonnage(id);
  };
  exports.Jeux2 = function(largeurtotal, hauteurtotal, toptotal, lefttotal)
  {
    main(largeurtotal, hauteurtotal, toptotal, lefttotal);
  }
  exports.totaldata = [tableaudesMurs, tableaudesPersonnage, tableaudesProjectiles];
  
  



