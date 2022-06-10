package com.platformBackend.service;

import com.platformBackend.model.entity.CategoryEntity;
import com.platformBackend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryEntity> findAll() {
        return categoryRepository.findAll();
    }
}
