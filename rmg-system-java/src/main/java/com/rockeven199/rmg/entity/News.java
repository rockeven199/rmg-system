package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class News {
    public int news_id;
    public String news_title;
    public String news_text;
    public String news_author;
    public String news_pub_datetime;
}
