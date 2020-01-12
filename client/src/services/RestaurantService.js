

export default {

    pageSize:30,
    pageNum:0,
    nbResults:0,

    getPageNum(){
        return this.pageNum;
    },

    setPageNum(variable){
        this.pageNum = variable;
    },

    getPageSize(){
        return this.pageSize;
    },

    setPageSize(variable){
        this.pageSize = variable;
    },

    getNbResults(){
        return this.nbResults;
    },

    setNbResults(variable){
        this.nbResults = variable;
    }
}