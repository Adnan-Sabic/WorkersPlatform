package com.platformBackend.controller;

import com.platformBackend.model.entity.CategoryEntity;
import com.platformBackend.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@CrossOrigin("*")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    @ResponseBody
    public List<CategoryEntity> findAll() {
        return categoryService.findAll();
    }
}
