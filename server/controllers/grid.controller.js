var Zone = require("../models/zone.model");
var ZoneType = require("../models/zone-type.model");

var area;     // the area is the area where we have the grid
              //    [{ x: longitud,y: latitude},   // north west corner
//   {x : longitud y : latitude}]   // south east corner
var interval; // the distnace in degrees of one unit in the grid
var fs = require('fs');
var output = "";
var longiArr = [];
var latiArr = [];
var longiLen;
var latiLen;
var grid = [];

var interval = 0.00005;
/* var P = [];     //polygons
 P[0] = [
 {x : 32.336238, y :-111.083745},
 {x : 32.328406, y :-111.083230},
 {x : 32.328855, y :-111.074487},
 {x : 32.330305, y :-111.075474},
 {x : 32.331742, y :-111.074390}
 ];
 P[1] = [
 {x : 32.318882,  y :-111.077399},
 {x : 32.317504,  y :-111.073151},
 {x : 32.323161,  y :-111.072378}
 ];
 P[2] = [
 {x : 32.320477,  y :-111.085339},
 {x : 32.315545,  y :-111.089201},
 {x : 32.312535,  y :-111.083322}
 ];
 var risk = [3,1,2];
 */

exports.updateTemporal = function (zoneData, value) {

};

exports.renderGrid = function (req, res) {
    map.init();
    //var startNode = map.cache["map_" + droneGrid[1] + "_" + droneGrid[0]];//new map.Node(0,0);


    //var endNode = map.cache["map_" + deliverGrid[1] + "_" + deliverGrid[0]];// new map.Node(map.gridWidth-2,map.girdHeight-2);

    // var droneCoor =    [32.23367666858624, -110.96636652946472];//drone coordinate(longitude, latitude)
    // var deliverCoor =  [32.229883111566146, -110.961012840271];
    var droneCoor = [32.6106688, -111.3175129];//drone coordinate(longitude, latitude)
    var deliverCoor = [32.610616, -111.3174634];

    var droneGrid = [];
    var deliverGrid = [];
    //find drone and deliver node in grid
    if (droneCoor.length == 2) {
        droneGrid.push(Math.round((area[0].x - droneCoor[0]) / interval));//droneGrid(row, column)
        droneGrid.push(Math.round((droneCoor[1] - area[0].y) / interval));
        console.log("drone row is ", droneGrid[0], "column is ", droneGrid[1]);
    }
    if (deliverCoor.length == 2) {
        deliverGrid.push(Math.round((area[0].x - deliverCoor[0]) / interval));
        deliverGrid.push(Math.round((deliverCoor[1] - area[0].y) / interval));
        console.log("deliver row is ", deliverGrid[0], "column is ", deliverGrid[1]);
    }


    var startNode = map.cache["map_" + droneGrid[1] + "_" + droneGrid[0]];
    var endNode = map.cache["map_" + deliverGrid[1] + "_" + deliverGrid[0]];

    aStar(startNode, endNode);
    var s = map.getUI();
    //console.log("s->> ",s)

    res.send(s);
};

var aStar = function (start, end) {


    map.setStartNode(start);
    map.setEndNode(end);
    console.log('runnign pathing');
    var arr = map.getPath();
    // console.log('close area',map.closeArea);

    var wayPoint = map.getWayPoint();
    console.log(wayPoint);
    var wayPointCoor = map.gridToCoor(wayPoint);
    console.log("waypoints coordinates", wayPointCoor);

    return wayPointCoor;
};

var aStarComplete = function (droneLocation, userLocation) {
    map.init();
    var droneCoor = [droneLocation.latitude, droneLocation.longitude];//drone coordinate(longitude, latitude) //assign drone start coordinates
    var deliverCoor = [userLocation.latitude, userLocation.longitude];  //assign deliver (destination) coordinates
    // var droneCoor = [32.23367666858624, -110.96636652946472];//drone coordinate(longitude, latitude)
    // var deliverCoor = [32.229883111566146, -110.961012840271];


    var droneGrid = [];
    var deliverGrid = [];
    //find drone and deliver node in grid
    if (droneCoor.length == 2) {
        droneGrid.push(Math.round((area[0].x - droneCoor[0]) / interval));//droneGrid(row, column)
        droneGrid.push(Math.round((droneCoor[1] - area[0].y) / interval));
        console.log("drone row is ", droneGrid[0], "column is ", droneGrid[1]);
    }
    if (deliverCoor.length == 2) {
        deliverGrid.push(Math.round((area[0].x - deliverCoor[0]) / interval));
        deliverGrid.push(Math.round((deliverCoor[1] - area[0].y) / interval));
        console.log("deliver row is ", deliverGrid[0], "column is ", deliverGrid[1]);
    }


    var startNode = map.cache["map_" + droneGrid[1] + "_" + droneGrid[0]];
    var endNode = map.cache["map_" + deliverGrid[1] + "_" + deliverGrid[0]];
    // return [droneLocation,userLocation];
    // var waypoints = aStar(startNode,endNode);
    // waypoints.push());
    return aStar(startNode, endNode);
};


exports.aStar = aStar;
exports.aStarComplete = aStarComplete;
var updateZone = function (zoneData) {
    var polygon = convertZoneToPolygon(zoneData);
    //console.log("area",area);
    //console.log("zoneData.vertices",zoneData.vertices);
    console.log("polygon", polygon);
    //console.log("latiArr",latiArr);
    //console.log("longiArr",longiArr);
    var risk = zoneData.risk;
    console.log('risk', risk);
    //searching for inside nodes
    vertexNum = polygon.length;
    if (vertexNum > 2) {      //confirm it is a polygon
        var xMax = polygon[0].x;
        var yMax = polygon[0].y;
        var xMin = polygon[0].x;
        var yMin = polygon[0].y;
        for (var i = 1; i < vertexNum; i++) {
            xMax = Math.max(xMax, polygon[i].x);
            yMax = Math.max(yMax, polygon[i].y);
            xMin = Math.min(xMin, polygon[i].x);
            yMin = Math.min(yMin, polygon[i].y);
        }
        //console.log("xMax = ",xMax);
        //console.log("yMax = ",yMax);
        //console.log("xMin = ",xMin);
        //console.log("yMin = ",yMin);
        if (xMax <= area[0].x && yMin >= area[0].y   //confirm the polygon is in valid area
            && xMin > area[1].x && yMax < area[1].y) {
            //console.log("in valid area");
            var checkFromX = parseInt((area[0].x - xMax) / interval); //X is the number of element in longitude
            var checkToX = parseInt((area[0].x - xMin) / interval) + 1;
            var checkFromY = parseInt((yMin - area[0].y) / interval); //Y is the number of element in latitude
            var checkToY = parseInt((yMax - area[0].y) / interval) + 1;
            // console.log(checkFromX, checkToX, checkFromY, checkToY);


            for (var m = checkFromX; m <= checkToX; m++) {
                for (var n = checkFromY; n <= checkToY; n++) {
                    var count = 0;
                    for (var i = 0; i < vertexNum; i++) {
                        //console.log("checking........");
                        if (i == vertexNum - 1) {
                            if (Intersect(polygon[i].x, polygon[i].y, polygon[0].x, polygon[0].y, longiArr[m], latiArr[n], longiArr[m], area[1].y))
                                count++;
                        }
                        else {
                            if (Intersect(polygon[i].x, polygon[i].y, polygon[i + 1].x, polygon[i + 1].y, longiArr[m], latiArr[n], longiArr[m], area[1].y))
                                count++;
                        }
                    }
                    //console.log(count);
                    if (count % 2) {
                        // console.log(m, n,risk);
                        output = output + m + " " + n + " " + risk + '\n';    //output for test
                        grid[m][n] = risk;
                    }
                }
            }
        }
        else
            console.log("Out valid area");
    }
    else
        console.log("No polygon selected");

    fs.writeFile('msg.txt', output, function (err) {
        if (err) {
            console.log('Erorr!!', err);
        } else
            console.log("Success");
    });
};
var update = function (zone) {
    // get riskiness value from zone
    zone.risk = 3.0;
    console.log('update', zone.zoneType);
    ZoneType.findOne({_id: zone.zoneType}).exec(function (err, zoneType) {
        if (zoneType == undefined) {
            console.log("Grid Controller ERROR!! Zone type is undefined");
        } else {
            console.log('ZoneType.risk', zoneType.value);
            zone.risk = zoneType.value;
            console.log('zone.risk', zone.risk);
            updateZone(zone);
        }

    });


};

exports.update = update;


var map = {
    gridWidth: undefined,
    girdHeight: undefined,
    // roadBlock : 0.1,
    init: function () {
        map.gridWidth = latiLen;
        map.girdHeight = longiLen;
        map.costEnergy_S = 10;
        map.costEnergy_L = 14;
        map.openArea = [];
        map.closeArea = {};

        map._createMapData();

    },
    /**  创建网格数据 */
    _createMapData: function () {
        var cache = map.cache;

        map.data = [];
        //console.log('heihg ',map.girdHeight, map.gridWidth);

        for (var y = 0; y < map.girdHeight; y++) {
            var _arr = [];
            for (var x = 0, mapNode; x < map.gridWidth; x++) {
                mapNode = new map.Node(x, y);
                mapNode.risk = grid[y][x];  //```````````````````````

//                    if (Math.random() < map.roadBlock) {
//                        mapNode.isRoadBlock = true;
//                        map.closeArea[mapNode.id] = mapNode;
//                    };
                map.cache[mapNode.id] = mapNode;
                _arr.push(mapNode);
            }
            map.data.push(_arr);
            // console.log('_arr',_arr);
        }
    },
    /**  建立地图网格 */

    getUI: function () {
        var table = [];
        var data = map.data;
        var css = '<link rel="stylesheet" type="text/css" href="/css/site.css">';
        table.push('<table cellpadding="0" cellspacing="1" bgcolor="0" class="map">');
        table.push('<tbody>');
        //console.log('data ',data);
        for (var y = 0, yl = data.length; y < yl; y++) {
            table.push('<tr>');
            for (var x = 0, xl = data[y].length; x < xl; x++) {
                //table.push('<td id="'+ data[y][x].id +'" class="'+ (data[y][x].risk > 0 ? 'map_close' : 'map_open') +'"></td>')
                if (data[y][x].risk < 0.2) {
                    color = 'map_0';
                } else if (data[y][x].risk < 2) {
                    color = 'map_1';
                } else {
                    color = 'map_2';
                }
                /*
                 switch (data[y][x].risk){
                 case 0:
                 color = 'map_0';
                 break;
                 case 1:
                 color = 'map_1';
                 break;
                 case 2:
                 color = 'map_2';
                 break;
                 case 3:
                 color = 'map_3';
                 break;
                 }*/
                table.push('<td id="' + data[y][x].id + '" class="' + color + '"></td>');
            }
            table.push('</tr>');
        }
        table.push('</tbody>');
        table.push('</table>');

        // map.container = document.createElement('div');
        // map.container.innerHTML
        map.container = css + table.join('');

        return map.container;
    },
    Node: function (x, y) {
        this.x = x;
        this.y = y;
        this.id = 'map_' + x + '_' + y;
        //this.isRoadBlock = false;
        this.risk = 0;
        this.prev = null;
        this.fObj = null;
    },
    getNode: function (x, y) {
        return map.cache['map_' + x + '_' + y];
    },
    setStartNode: function (node) {
        map.startNode = node;
    },
    setEndNode: function (node) {
        map.endNode = node;
    },
    /**  检测当前开启列表中是否含有传进来的Node 存在则从开启列表中选中将其返回*/
    _isOpenAreaExitNode: function (node) {
        var openArea = map.openArea;
        for (var i = 0, l = openArea.length; i < l; i++) {
            if (openArea[i].id === node.id) return openArea[i];
        }
        return null;
    },
    getPath: function () {
        map.getAroundNode(map.startNode);
        console.log('getPath1');
        if (map.openArea.length == 0) return;
        console.log('getPath2');

        map.search(map.endNode);
        console.log('getPath3')

    },
    /**  获取当前点的F G H值 */
    getF: function (cNode, aNode) {
        var energyW = Math.abs(map.endNode.x - aNode.x) * map.costEnergy_S;
        var energyH = Math.abs(map.endNode.y - aNode.y) * map.costEnergy_S;
        var _H = energyW + energyH;
        var _G = (Math.abs(aNode.x - cNode.x) === Math.abs(aNode.y - cNode.y) ? map.costEnergy_L : map.costEnergy_S);

        if (cNode.id == map.startNode.id) {
            var energyWs = Math.abs(map.endNode.x - map.startNode.x) * map.costEnergy_S;
            var energyHs = Math.abs(map.endNode.y - map.startNode.y) * map.costEnergy_S;
            var _Hs = energyWs + energyHs;
            var _Gs = 0;
            map.startNode.fObj = {F: _Hs + _Gs, H: _Hs, G: _Gs};
        }

        if (cNode.fObj) {
//                console.log( cNode.id, cNode.fObj.G, _G, aNode.risk);
            _G = cNode.fObj.G + _G + aNode.risk * 10;
        }

        return {F: _H + _G, H: _H, G: _G};
    },
    /**  获取当前父节点周围的点  */
    getAroundNode: function (node) {
        var maxHeight = map.girdHeight;
        var maxWidth = map.gridWidth;
        var nodeX;
        var nodeY;
        //var corner = [];    // 8 dir

        for (var x = -1; x <= 1; x++) {
            nodeX = node.x + x;
            for (var y = -1, mapNode, _fObj, tmpNode; y <= 1; y++) {
                nodeY = node.y + y;
                //剔除本身
                if (x === 0 && y === 0) continue;
                if (nodeX >= 0 && nodeY >= 0 && nodeX < maxWidth && nodeY < maxHeight) {
                    mapNode = map.getNode(nodeX, nodeY);

                    //查找周围的新节点， 如果新节点处于拐角则跳过
                    //if (Math.abs(x) == Math.abs(y) && map._isCorner(mapNode, { x : x, y : y })) continue;

                    if (!map.closeArea[mapNode.id]) {
                        _fObj = map.getF(node, mapNode);
                        // 如果周围节点已在开启区域的 根据当前节点 获取新的G值  与当前点的进行比较 如果小于以前的G值 则指定当前节点为其父节点
                        tmpNode = map._isOpenAreaExitNode(mapNode);
                        if (tmpNode) {
                            if (tmpNode.fObj.G <= _fObj.G) continue;
                        }
//                            console.log(node.x, node.y, nodeX, nodeY, _fObj.G);
                        mapNode.fObj = _fObj;
                        mapNode.prev = node;
                        map.openArea.push(mapNode);
                    }
                }
            }
        }
    },
//        /**  监测节点是否为拐角， 如果是 从开启列表中移除穿越拐角到达的点 */
//        _isCorner : function(node, obj) {
//            var closeArea = map.closeArea;
//            var x = obj.x;
//            var y = obj.y;
//            var getNode = map.getNode;
//
//            if (Math.abs(x) === Math.abs(y)) {
//                if (x > 0 && y < 0) {
//                    return closeArea[new getNode(node.x, node.y + 1).id] || closeArea[new getNode(node.x - 1, node.y).id];
//                };
//
//                if (x < 0 && y > 0) {
//                    return closeArea[new getNode(node.x, node.y - 1).id] || closeArea[new getNode(node.x + 1, node.y).id];
//                };
//
//                if (x === y && x > 0) {
//                    return closeArea[new getNode(node.x, node.y - 1).id] || closeArea[new getNode(node.x - 1, node.y).id];
//                };
//
//                if (x === y && x < 0) {
//                    return closeArea[new getNode(node.x, node.y + 1).id] || closeArea[new getNode(node.x + 1, node.y).id];
//                };
//            };
//        },
    /**  不断删除查找周围节点，直到找寻到结束点 */
    search: function (node) {
        while (!map.closeArea[node.id]) {
            var _fMinNode = map._getFMin();
            if (!_fMinNode) break;
            map.getAroundNode(_fMinNode);
            map.search(node);
        }
        if (map.closeArea[node.id]) {
            // map._drawRoad(node);
        }
    },
    /**  绘制路线 */
    _drawRoad: function (node) {
        // document.getElementById(node.id).style.background = '#EFA626';
        if (node.prev !== map.startNode) {
            map._drawRoad(node.prev);
//                console.log("draw", node.id);
        }
    },
    /**  从开启列表从寻找F点最小的点 从开启列表移除 移入关闭列表 */
    _getFMin: function () {
        if (map.openArea.length == 0) return null;
        map._orderOpenArea();
        map.closeArea[map.openArea[0].id] = map.openArea[0];
//            document.getElementById(map.openArea[0].id).innerHTML = map.openArea[0].fObj.F + '=' + map.openArea[0].fObj.G + '+' + map.openArea[0].fObj.H;
        return map.openArea.shift();
    },
    /**  排序开启列表 */
    _orderOpenArea: function () {
        this.openArea.sort(function (objF, objN) {
            return objF.fObj.F - objN.fObj.F;
        });
    },

    getWayPoint: function () {
        var pathNodes = [];  //pathNodes is the grid coordinates list of nodes on the path from endNode to startNode
        pathNodes[0] = [];
        pathNodes[1] = [];
        //console.log("map endNode",map.endNode);
        pathNodes[0][0] = map.endNode.x;
        pathNodes[1][0] = map.endNode.y;
        var node = map.endNode;
        console.log('node is ', node);
        while (node.prev.id !== map.startNode.id) {
            pathNodes[0].push(node.prev.x);
            pathNodes[1].push(node.prev.y);
            node = node.prev;
        }

        pathNodes[0].push(map.startNode.x);
        pathNodes[1].push(map.startNode.y);

        /**freeman chain value assignment*/
        var freeman = [];
        var straightCount = 0;
        var diagonalCount = 0;
        var pathNodesLen = pathNodes[0].length;
        for (var t = 0; t < pathNodesLen - 1; t++) {    //freeman chain value assignment
            if (pathNodes[0][t + 1] - pathNodes[0][t] == 1 && pathNodes[1][t + 1] - pathNodes[1][t] == 0) {
                freeman.push(0);
                straightCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == 1 && pathNodes[1][t + 1] - pathNodes[1][t] == -1) {
                freeman.push(1);
                diagonalCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == 0 && pathNodes[1][t + 1] - pathNodes[1][t] == -1) {
                freeman.push(2);
                straightCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == -1 && pathNodes[1][t + 1] - pathNodes[1][t] == -1) {
                freeman.push(3);
                diagonalCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == -1 && pathNodes[1][t + 1] - pathNodes[1][t] == 0) {
                freeman.push(4);
                straightCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == -1 && pathNodes[1][t + 1] - pathNodes[1][t] == 1) {
                freeman.push(5);
                diagonalCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == 0 && pathNodes[1][t + 1] - pathNodes[1][t] == 1) {
                freeman.push(6);
                straightCount++;
            } else if (pathNodes[0][t + 1] - pathNodes[0][t] == 1 && pathNodes[1][t + 1] - pathNodes[1][t] == 1) {
                freeman.push(7);
                diagonalCount++;
            }
        }
        console.log("freeman chain", freeman);

        /**average risk of the path*/
        var distance = straightCount * 10 + diagonalCount * 14;
        console.log("G is", map.endNode.fObj.G, "distance is ", distance);
        var averageRisk = (map.endNode.fObj.G - distance) / distance;
        console.log("average risk is", averageRisk);

        /**search waypoints*/
        /** search two times: from begin to end, from end to begin */
        var wayPoint1 = [];
        for (var w = 0; w < pathNodesLen - 2; w++) {
            if (freeman[w + 1] != freeman[w]) {
                if (((w + 2) <= (pathNodesLen - 2)) && freeman[w + 2] == freeman[w]) {
                    w++;    //if the next next direction is same, this is not corner, and skip next direction
                } else {
                    wayPoint1.push(w + 1); //store index of corner in pathNode
                }
            }
        }

        var wayPoint2 = [];
        for (var w = pathNodesLen - 2; w > 0; w--) {
            if (freeman[w - 1] != freeman[w]) {
                if (((w - 2) >= 0) && freeman[w - 2] == freeman[w]) {
                    w--;
                } else {
                    wayPoint2.push(w);
                }
            }
        }

        /** function to unique Array element and sort the array */
        Array.prototype.uniqueSort = function () {
            var a = {};
            var len = this.length;
            for (var i = 0; i < len; i++) {
                if (typeof a[this[i]] == "undefined") a[this[i]] = 1;
            }
            this.length = 0;
            for (var i in a) {
                this[this.length] = i;
            }
            return this;
        }

        var wayPointCombine = wayPoint1.concat(wayPoint2).uniqueSort(); //combine two arrays and unique element, sort

        var wayPoint = [];
        wayPoint[0] = [];
        wayPoint[1] = [];

        for (var a = 0; a < wayPointCombine.length; a++) {
            wayPoint[0].push(pathNodes[0][wayPointCombine[a]]);
            wayPoint[1].push(pathNodes[1][wayPointCombine[a]]);
        }

        return wayPoint;
    },
    gridToCoor: function (wayPoint) {
        var wayPointCoor = [];
        for (var w = 0; w < wayPoint[0].length; w++) {
            var wayPointTemp = {};
            wayPointTemp.longitude = latiArr[wayPoint[0][w]];
            wayPointTemp.latitude = longiArr[wayPoint[1][w]];
            wayPointCoor.push(wayPointTemp);
        }
        return wayPointCoor;
    },

    data: [],
    openArea: [],
    closeArea: {},
    cache: {},
    startNode: null,
    endNode: null,
    container: null
};


exports.initMap = function (inputArea, inputInterval) {
    if (inputArea === undefined) {
        area = [

            // This is for the test site
            //{y: -111.34248733520508, x: 32.62130393065182},
            //{y: -111.29596710205078, x: 32.59946936560498}

            // {x:32.6111701,y:-111.3178449},
            // {x:32.607023, y:-111.311575}

            // This is for the office
            {y: -110.97187042236328, x: 32.23581841551991},
            {y: -110.94388961791992, x: 32.22256781531621}

            //    {x: 32.235782115145, y: -110.96873760223389},
            //    {x: 32.22775937653396, y: -110.95942497253418}
            // {x : 32.34, y : -111.09},   //left up corner
            //  {x: 32.308644,y:  -111.069240}
            // {x : 32.34, y : -111.09},   //left up corner
            // {x : 32.08, y : -110.73}    //right down corner
        ];
    } else {
        area = inputArea;
    }
    console.log('init map', area);

    if (inputInterval === undefined) {
        // interval = 0.00020;
    } else
        interval = inputInterval;


    // initialize the map
    for (var longi = area[0].x; longi > area[1].x; longi -= interval) {
        longiArr.push(longi);
    }
    // console.log(longiArr.length);   //5200 row
    for (var lati = area[0].y; lati < area[1].y; lati += interval) {
        latiArr.push(lati);
    }
    // console.log(latiArr.length);    //7200 column
    console.log("The grid has been initialized ", longiArr.length, latiArr.length);    //7200 column

    longiLen = longiArr.length;
    latiLen = latiArr.length;
    console.log('latiLen', latiLen);
    console.log('longiLen', longiLen);
    for (i = 0; i < longiLen; i++) {
        grid[i] = [];
        for (j = 0; j < latiLen; j++) {
            grid[i][j] = 0;
        }
    }
    map.init();

    // query the db
    // for all the messhes
    Zone.find({}).exec(function (err, collections) {
        for (var i = collections.length - 1; i >= 0; i--) {
            var zone = collections[i];
            update(zone);
        }
    });

};

var convertZoneToPolygon = function (zoneData) {
    var vertices = zoneData.vertices;
    var n = vertices.length;
    var polygon = [];
    for (var i = 0; i < n; i++) {
        var v = vertices[i];
        polygon.push({x: v.latitude, y: v.longitude});
    }
    return polygon;
};

function Cross(p1x, p1y, p2x, p2y, p3x, p3y) {
    return (p3x - p1x) * (p2y - p1y) - (p3y - p1y) * (p2x - p1x);
}
// returns true if the point is on the line.
// Whether p3 is on line p1p2
function OnSegment(p1x, p1y, p2x, p2y, p3x, p3y) {
    var x_min, x_max, y_min, y_max;
    if (p1x < p2x) {
        x_min = p1x;
        x_max = p2x;
    } else {
        x_min = p2x;
        x_max = p1x;
    }
    if (p1y < p2y) {
        y_min = p1y;
        y_max = p2y;
    } else {
        y_min = p2y;
        y_max = p1y;
    }
    if (p3x < x_min || p3x > x_max || p3y < y_min || p3y > y_max)
        return false;
    else
        return true;
}
function Intersect(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) { //p1,p2 are vertices of polygon; p3 is the check point;
    // p4 is the infinite point, for here it is the point on the right edge of the area
    var d1 = Cross(p3x, p3y, p4x, p4y, p1x, p1y);
    var d2 = Cross(p3x, p3y, p4x, p4y, p2x, p2y);
    var d3 = Cross(p1x, p1y, p2x, p2y, p3x, p3y);
    var d4 = Cross(p1x, p1y, p2x, p2y, p4x, p4y);

    if (d1 * d2 < 0 && d3 * d4 < 0)
        return true;
    else if (d1 == 0 && OnSegment(p3x, p3y, p4x, p4y, p1x, p1y))
        return true;
    else if (d2 == 0 && OnSegment(p3x, p3y, p4x, p4y, p2x, p2y))
        return true;
    else if (d3 == 0 && OnSegment(p1x, p1y, p2x, p2y, p3x, p3y))
        return true;
    else if (d4 == 0 && OnSegment(p1x, p1y, p2x, p2y, p4x, p4y))
        return true;
    else
        return false;
}