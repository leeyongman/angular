 
module.exports = function(app, Hero)
{
    const express = require('express');
    const router = express.Router();
 
    router.delete('/heroes/:userid', function(req, res){
        const pid = req.params.userid;
        Hero.deleteOne({ _id: pid }, function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
    }); 
    
    router.get('/heroes', function(req, res){
        Hero.find(function(err, heros){
            if(err) return res.status(500).send({error: 'database failure'});
            //res.json(heros);
            var nHero = new Array();
            heros.forEach(element => {
                if (element.name !== undefined){
                    nHero.push(element);
                }
            });
            nHero.sort(function(a, b){
                return (parseInt(a.id, 10) > parseInt(b.id, 10)) ? 1 : (parseInt(a.id, 10) < parseInt(b.id, 10)) ? -1 : 0;
            });
            res.send(200, nHero);
        })
    });

    router.post('/heroes', function(req, res){
        
        console.log('route start');
        console.log(req);
        console.log(req.body.id);
        console.log(req.body.name);
        console.log('end');

        var hero = new Hero();
        hero.id = req.body.id;
        hero.name = req.body.name; 
    
        hero.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            console.log(hero);
            res.json({result: hero});
        });
    });
    return router;
}