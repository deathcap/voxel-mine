// Generated by CoffeeScript 1.6.3
(function() {
  var EventEmitter, Mine, inherits;

  inherits = require('inherits');

  EventEmitter = (require('events')).EventEmitter;

  module.exports = function(game, opts) {
    return new Mine(game, opts);
  };

  Mine = function(game, opts) {
    this.game = game;
    opts = opts != null ? opts : {};
    if (opts.defaultHardness == null) {
      opts.defaultHardness = 3;
    }
    if (opts.instaMine == null) {
      opts.instaMine = false;
    }
    if (opts.reach == null) {
      throw "voxel-mine requires 'reach' option set to voxel-reach instance";
    }
    this.opts = opts;
    this.instaMine = opts.instaMine;
    this.progress = 0;
    this.reach = opts.reach;
    this.bindEvents();
    return this;
  };

  Mine.prototype.bindEvents = function() {
    var _this = this;
    return this.reach.on('mining', function(target) {
      if (!target) {
        console.log("no block mined");
        return;
      }
      _this.progress += 1;
      _this.drawDamage(target);
      if (_this.instaMine || _this.progress > _this.opts.defaultHardness) {
        _this.progress = 0;
        return _this.emit('break', target.voxel);
      }
    });
  };

  Mine.prototype.drawDamage = function(target) {
    var a, b, cube, geometry, material, mesh, obj;
    a = {
      x: 10,
      y: 10
    };
    b = {
      x: 50,
      y: 50
    };
    a = {
      x: 0,
      y: 0
    };
    b = {
      x: 1,
      y: 1
    };
    geometry = new this.game.THREE.Geometry();
    geometry.vertices.push(new this.game.THREE.Vector3(a.x, a.y, 2));
    geometry.vertices.push(new this.game.THREE.Vector3(b.x, a.y, 2));
    geometry.vertices.push(new this.game.THREE.Vector3(b.x, b.y, 2));
    geometry.vertices.push(new this.game.THREE.Vector3(a.x, b.y, 2));
    geometry.faces.push(new this.game.THREE.Face3(0, 1, 2));
    geometry.faces.push(new this.game.THREE.Face3(0, 2, 3));
    geometry.computeCentroids();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    console.log(geometry);
    material = new this.game.THREE.MeshLambertMaterial();
    material.side = this.game.THREE.FrontSide;
    mesh = new this.game.THREE.Mesh(geometry, material);
    obj = new game.THREE.Object3D();
    obj.add(mesh);
    obj.position.set(target.voxel[0] + 0.5, target.voxel[1] + 0.5, target.voxel[2] + 0.5);
    return cube = game.addItem({
      mesh: obj,
      size: 1
    });
  };

  inherits(Mine, EventEmitter);

}).call(this);
