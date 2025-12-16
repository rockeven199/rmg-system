package com.rockeven199.rmg.utils;

import com.rockeven199.rmg.entity.Resource;

import java.util.ArrayList;
import java.util.List;

public class DataPagination {

    public Object splitSize(List<Resource> data, Integer page_Num, Integer page_Size) {
        ArrayList temp = new ArrayList();
        ArrayList returnData = new ArrayList();

        for (int a = 0; a < data.size(); a++) {
            if (a % page_Size == 0 && a != 0) {
                returnData.add(temp);
                temp = new ArrayList();
                temp.add(data.get(a));
            } else {
                temp.add(data.get(a));
            }
        }

        if (returnData.size() < data.size()) {
            temp = new ArrayList();
            temp = new ArrayList();
            for (int i = 0; i < data.size() - (returnData.size() * page_Size); i++) {
                temp.add(data.get((returnData.size() * page_Size) + i));
            }

            returnData.add(temp);
        }

        return returnData.get(page_Num - 1);
    }


}
