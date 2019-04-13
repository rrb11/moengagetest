$(document).ready(function(){
    getCampain(1);
    searchBar();
});

function getCampain(id)
{
    let endValue = id * 10;
    let startValue = endValue -10;
    $.getJSON('data.json',function(data){
        let start = 0;
        let end = 10;
        let totalCount = Math.round(data.length/10);
        let getInformation = getData(data,startValue,endValue);
        if(getInformation.length > 0)
        {
            createTable(getInformation);
            if(id == 1)
            {
                createPagination(totalCount);
            }
        }
       
    });
}

function getData(data,start,end)
{
    let newArray = [];
    for(let i=start;i<end;i++)
    {
        newArray.push(data[i]);
    }
    return newArray;
}

function createTable(data)
{
    $("#inputData > tr").remove();
    let html;
    data.forEach(function(element){
        html += '<tr>';
        html += '<td><input type="checkbox" name="id" class="id"></td>';
        html += '<td>'+element.name+'</td>';
        html += '<td>'+element.type+'</td>';
        html += '<td>'+element.company+'</td>';
        html += '</td><td></td></tr>';
    });
    $('#inputData').append(html);
}

function createPagination(totalCount)
{
    let html;
    for(let i = 1; i<totalCount;i++)
    {
        html = '<a href="#" onclick="paginationData('+i+')">'+i+'</a>'
        $('.pagination').append(html);
    }
}

function paginationData(id)
{
    getCampain(id);
}

function searchBar()
{
    $('.search-text').on('blur',function(){
        let value = $(this).val();
        if(value == "")
        {
            getCampain(2);
        }
        $.getJSON('data.json',function(data){
            let campainData = data.filter(function(item){
                console.log(item.name,value);
                return item.name == value;
            })
           if(campainData.length > 0)
           {
            createTable(campainData);
           }
        });
    });
}