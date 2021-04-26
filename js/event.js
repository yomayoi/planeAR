////aマーカ読み取り時のイベント
smoothedControls.addEventListener('becameVisible', function ()
{
    ///環境光
    for (var i = 0; i < 2; i++)
    {
        lightobj[i].visible = true;
    }
    ///object
    for (var k = 0; k < 4; k++)
    {
        object[k].visible = true;
    }
    ///軸表示
    for (var j = 0; j < 9; j++)
    {
        axisArray[j].visible = true;
    }
    ///grid
    //xy
    xygrid.addEventListener('click', function ()
    {
        gridArray[0].visible = true;
    })
    xygrid.addEventListener('touchstart', function ()
    {
        gridArray[0].visible = true;
    })
    //yz
    yzgrid.addEventListener('click', function ()
    {
        for (var l = 1; l < 3; l++)
        {
            gridArray[l].visible = true;
        }
    })
    yzgrid.addEventListener('touchstart', function ()
    {
        for (var l = 1; l < 3; l++)
        {
            gridArray[l].visible = true;
        }
    })
    //xz
    xzgrid.addEventListener('click', function ()
    {
        for (var l = 3; l < 5; l++)
        {
            gridArray[l].visible = true;
        }
    })
    xzgrid.addEventListener('touchstart', function ()
    {
        for (var l = 3; l < 5; l++)
        {
            gridArray[l].visible = true;
        }
    })
    //cancel
    gridcancel.addEventListener('touchstart', function ()
    {
        for (var i = 0; i < 5; i++)
        {
            gridArray[i].visible = false;
        }
    })
    gridcancel.addEventListener('click', function ()
    {
        for (var i = 0; i < 5; i++)
        {
            gridArray[i].visible = false;
        }
    })
})

////aマーカ非読み取り時のイベント
smoothedControls.addEventListener('becameUnVisible', function ()
{
    for (var i = 0; i < 2; i++)
    {
        lightobj[i].visible = false;
    }
    for (var j = 0; j < 9; j++)
    {
        axisArray[j].visible = false;
    }
    for (var k = 0; k < 4; k++)
    {
        object[k].visible = false;
    }
})