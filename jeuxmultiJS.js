
var 
//vitesse de deplacement en x 
    i = 10,
//vitesse de deplacement en y
    j = 10,
//creation du personnage 
    tableaudesPersonnageexiste = false,
//stocker les projectiles
    tableaudesProjectiles = [],
//stocker les personnages
    tableaudesPersonnage = [],
//implementation des projectiles
    nouveauprojectile = 0,
//implementation des personnages
    nouveaupersonnage = 1,
//valider le chargement du jeux
    execution = false,
//deplacement du personnage en x
    manouvellepositionY = i,
//deplacement du personnage en y
    manouvellepositionX = j,
//enregistrer l'evenement de deplacement du personnage
    event,
//enregistrer la position du click en x
    clickX,
//enregistrer la position du click en y
    clickY;

// donnée renvoyées apres le chargement de la page :
// + dimensions de l'affichage client 
// + connection Web Socket avec le server
window.addEventListener('DOMContentLoaded', function()
{
var socket = io();

    var url = 'http://localhost:3000/';
    
    socket.on('connected', function()
    {
        console.log(socket.id);
        socket.emit('room' , socket.id)
        socket.emit('lancerlejeux',
        {
            largeur: $('.mydivmain').width(),
            longueur: $('.mydivmain').height(),
            top: $('.mydivmain').position().top,
            left: $('.mydivmain').position().left,
        })
    });


    //afficher les objets envoyés par le server
    socket.on('Affichage', function(data)
    {
        var tableaudesMurs = data[0];
            tableaudesPersonnage = data[1];
            tableaudesPersonnageexiste = true;

            for (var e = 0; e < tableaudesMurs.length; e++)
            {
                var g = tableaudesMurs[e];
                var htm2 = "<div class='" + g.class + "' id='" + g.id + "';style='width:" + (g.width) + "px;height:" + (g.height) + ";'> </div>";
                document.body.children[0].innerHTML += htm2;
                var monid = g.id;
                document.getElementById(monid).style.left = g.x + 'px';
                document.getElementById(monid).style.top = g.y + 'px';
            }
            for (var e = 0; e < tableaudesPersonnage.length; e++)
            {
                var g = tableaudesPersonnage[e];
                var htm2 = "<div class=mydiv id="+g.id+" ;style='display:block;left:" + (g.x) + "px;top:" + (g.y) + ";'> </div>";
                // $(htm2).appendTo(document.body.children[0]);
                document.body.children[0].innerHTML += htm2;
            }
        console.log('je suis la');
        var execution=true;
    })
    // modifier la position des objets pendant le jeux
    // + modifier la position des personnages
    // + modifier la position des projectiles
    socket.on('miseaJourAffichage', function(data, err)
    {
        console.log('je suis la2');
        if (execution)
        {
            tableaudesPersonnage = data[1];
            tableaudesProjectiles = data[2];
            
        };
            for (var e = 0; e < tableaudesPersonnage.length; e++)
            {
                if (tableaudesPersonnage.length > nouveaupersonnage)
                {
                    var longueur = tableaudesPersonnage.length - 1;
                    var g = tableaudesPersonnage[longueur];
                    var htm2 = "<div class=mydiv id=page1 ;style='display:block;left:" + (g.x) + "px;top:" + (g.y) + ";'> </div>";
                        // $(htm2).appendTo(document.body.children[0]);
                    document.body.children[0].innerHTML += htm2;
                    nouveaupersonnage += 1;
                    var g = tableaudesPersonnage[e];
                    var monid = g.id;
                    document.getElementById(monid).style.left = g.x + 'px';
                    document.getElementById(monid).style.top = g.y + 'px';
                }      
            }
            for (var i = 0; i < tableaudesProjectiles.length; i++)
            {
                if (tableaudesProjectiles.length > nouveauprojectile)
                {
                    var longueur = tableaudesProjectiles.length - 1;
                    var o = tableaudesProjectiles[longueur];
                    var leprojectile = document.createElement("div");
                    leprojectile.id = o.id;
                    leprojectile.style = o.Class;
                    leprojectile.style.width = o.width + 'px';
                    leprojectile.style.height = o.height + 'px';
                    leprojectile.style.display = "block";
                    leprojectile.classList.add('projectile');
                    document.body.children[0].appendChild(leprojectile);
                    nouveauprojectile += 1;
                    var g = tableaudesProjectiles[i];
                    var monid = g.id;
                    console.log(monid);
                    document.getElementById(monid).style.left = g.x + 'px';
                    document.getElementById(monid).style.top = g.y + 'px';
                }
            }
        });

    // enregistrer l'appui sur les fleches directionnelles
    window.addEventListener('keypress', function(newEvent)
    {
        console.log('tableaudesPersonnageexiste')
        if (tableaudesPersonnageexiste === true)
        {
            socket.emit('demanderpositionpersonnage');
            console.log('demanderpositionpersonnage');
            event = newEvent;
        }
    });
    //modifier la position du personnage
    socket.on('deplacement', function(data)
    {
        manouvellepositionY = data.y;
        manouvellepositionX = data.x;
        var reponse = false;
        if (event.keyCode == 37)
        {
            window.scroll(0, 0);
            if (reponse)
            {
                j = j + 20;
            }
            else
            {
                j = j - 10;
                manouvellepositionX = j;
            }
        }
        var reponse = false;
        if (event.keyCode == 38)
        {
            if (reponse)
            {
                window.scroll(0, 0);
                i = i + 20;
            }
            else
            {
                i = i - 10;
                manouvellepositionY = i;
            }
            window.scroll(0, 0);
        }
        var reponse = false;
        if (event.keyCode == 39)
        {
            window.scroll(0, 0);
            if (reponse)
            {
                j = j - 20;
            }
            else
            {
                j = j + 10;
                manouvellepositionX = j;
            }
            window.scroll(0, 0);
        }
        var reponse = false;
        if (event.keyCode == 40)
        {
            window.scroll(0, 0);
            if (reponse)
            {
                i = i - 20;
            }
            else
            {
                i = i + 10;
                manouvellepositionY = i;
            }
            window.scroll(0, 0);
        }
        socket.emit('bougerpersonnage',
        {
            y: manouvellepositionY,
            x: manouvellepositionX
        });
    });

    // enregistrer l'evenement de click
    // demander au server d'afficher un projectile
    window.addEventListener('click', function(Event)
    {
        if (tableaudesPersonnageexiste)
        {
            clickX = Event.clientX;
            clickY = Event.clientY;
                d = tableaudesPersonnage[0],
                a = d.x,
                b = d.y,
                x = a,
                y = b,
                sensX = ((clickX - a) * 0.02),
                sensY = ((clickY - b) * 0.02);
            console.log(sensY)
            socket.emit('bougerprojectile',
            {
                x,
                y,
                sensX,
                sensY
            });
        }
    });
});    
        