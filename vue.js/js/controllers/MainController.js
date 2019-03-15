import FormView from "../views/FormView.js";
import ResultView from "../views/ResultView.js";
import SearchModel from "../models/SearchModel.js";


const tag = '[MainController]' // 디버깅을 위하여 태그 설정,

/*
    실제 컨트롤러 구현
 */
export default {
    init(){
        console.log(tag, 'init()')
        FormView.setup(document.querySelector('form'))  // 일치하는 첫번째 form 태그 엘리멘트를 넘겨준다.
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())
        // @submit 태그라는 이벤트가 들어오면, 이벤트의 수행하라라고 등록(on)

        ResultView.setUp(document.querySelector('#search-result'))  // search-result id태그를 넘겨준다.
    },

    // 검색결과를 받아 해당하는 데이터를 onSearchResult 메소드에 넘겨한다.
    search(query){
        console.log(tag, 'onSearch()', query)
        SearchModel.list(query).then(data =>
                // list는 Promise 객체를 반환하기 때문에 then 메소드 사용가능
               // 넘어온 data를 onSearch로 넘겨준다.
            this.onSearchResult(data)
        )},


    onSubmit(input) {
        console.log(tag, 'onSubmit()', input)
        this.search(input)
    },

    onResetForm(){
        console.log(tag,'onResetForm')
    },

    onSearchResult(data){
        ResultView.render(data)
    }
}