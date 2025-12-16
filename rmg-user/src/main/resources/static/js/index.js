// 带状态表格
const reortStateElement = document.querySelectorAll(".reportState")
const tableData = document.querySelectorAll(".tableData")
reortStateElement.forEach((element, index) => {
    const dataset = element.dataset.state
    if (dataset === "待处理") {
        tableData[index].style.backgroundColor = "#ff8484";
    } else if (dataset === "处理完成") {
        tableData[index].style.backgroundColor = "#96f673";
        tableData[index].style.color = "#323232";
    } else {
        tableData[index].style.backgroundColor = "#f6f6f6";
        tableData[index].style.color = "#323232";
    }
})

//表格行浮动
const td = document.querySelectorAll("td")
const tr = document.querySelectorAll("tr")

//行编号
let hoverIndex;

td.forEach(item => {
    item.addEventListener("mouseover", (event) => {
        hoverIndex = event.target.dataset.trIndex
        tr.forEach(trItem => {
            if (hoverIndex === trItem.dataset.trIndex && (trItem.firstElementChild.id != 'table-header')) {
                trItem.classList.add("tr-hoverClass")
            }
        })

    })

    item.addEventListener("mouseleave", (event) => {
        event.stopPropagation()
        tr.forEach(trItem => {
            if (hoverIndex === trItem.dataset.trIndex) {
                trItem.classList.remove("tr-hoverClass")
            }
        })
    })
})