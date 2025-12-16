package com.rockeven199.rmg.controller;

import com.alibaba.fastjson2.JSONObject;
import com.rockeven199.rmg.mapper.ResourceMapper;

import com.rockeven199.rmg.utils.SetReturnMessage;
import com.rockeven199.rmg.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/resource")
public class ResourceController extends SetReturnMessage {

    @Autowired
    private ResourceService service;
    @Autowired
    private ResourceMapper mapper;

    // 根据字段获取数据
//    @RequestMapping("/get_save_position")
//    public ArrayList getSavePosition() {
//        int _size = mapper.getAll().size();
//
//        ArrayList _position = new ArrayList();
//        for (int i = 0; i < _size; i++) {
//            _position.add(mapper.getAll().get(i).getResource_position());
//        }
//        _position =
//                (ArrayList) _position.stream().distinct().collect(Collectors.toList());
//        return _position;
//    }

    //    获取资产存放状态
//    @RequestMapping("/get_save_state")
//    public ArrayList getSavestate() {
//        int _size = mapper.getAll().size();
//
//        ArrayList _state = new ArrayList();
//        for (int i = 0; i < _size; i++) {
//            _state.add(mapper.getAll().get(i).getResource_state());
//        }
//        _state =
//                (ArrayList) _state.stream().distinct().collect(Collectors.toList());
//        return _state;
//    }

    //分页切换
//    @RequestMapping("/get_pagination_resource")
//    public Object getPaginationResource(@RequestParam("pages_num") Integer pages_Num, @RequestParam("pages_size") Integer pages_size) {
//        return new DataPagination().splitSize(mapper.getAll(), (Integer) pages_Num, (Integer) pages_size);
//    }

    //    初始化数据表格
//    @RequestMapping("/init_total_count")
//    public Integer initTotalCount(@RequestParam("pages_size") Integer pages_size) {
//        if (mapper.getAll().size() % pages_size == 0) {
//            return mapper.getAll().size() / pages_size;
//        } else {
//            return (mapper.getAll().size() / pages_size) + 1;
//        }
//    }

    @GetMapping("/select_resource")
    public JSONObject select_resource(@RequestParam("startIndex") Integer startIndex, @RequestParam("endIndex") Integer endIndex) {
        return service.selectResource(startIndex, endIndex);
    }

    @DeleteMapping("/delete_resource/{id}")
    public JSONObject delete(@PathVariable Integer id) {
        return service.deleteResource(id);
    }


    @PutMapping("/update_resource")
    public JSONObject updateResource(@RequestParam("yield") String yield, @RequestParam("value") String value, @RequestParam("id") Integer id) {
        return service.updateResource(yield, value, id);
    }

    @GetMapping("/insert_resource")
    public JSONObject insertResource(@RequestParam("resource_name") String name, @RequestParam("resource_count") String count, @RequestParam("resource_position") String position, @RequestParam("resource_state") String state) {
        return service.insertResource(name, count, position, state);
    }

    @GetMapping("/query_keywords")
    public JSONObject queryKeywords(@RequestParam("keywords") String keywords) {
        return service.queryKeywords(keywords);
    }
}
