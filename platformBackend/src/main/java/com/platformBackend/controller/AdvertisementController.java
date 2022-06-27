package com.platformBackend.controller;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.enums.AdvType;
import com.platformBackend.model.request.CreateAdvertisementRequest;
import com.platformBackend.model.request.EditAdvertisementRequest;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.model.response.JwtUser;
import com.platformBackend.model.response.OneAdvertisementResponse;
import com.platformBackend.service.AdvertisementService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/advertisements")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping
    @ResponseBody
    public Page<AdvertisementResponse> findAll(
            Authentication authentication,
            @RequestParam(required = false, defaultValue = "ALL") AdvType type,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Integer cityId,
            @RequestParam(required = false) String title,
            @RequestParam(required = false, defaultValue = "OTHER") String whichAdvertisement,
            @RequestParam(required = false, defaultValue = "true") Boolean active,
            @PageableDefault(sort = {}, size = 6) Pageable pageable) {
        Integer ownerId = null;
        if ("MY".equals(whichAdvertisement)) {
            ownerId = ((JwtUser) authentication.getPrincipal()).getId();
        }
        return advertisementService.findAll(pageable, type, categoryId, cityId, title, ownerId, active);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public OneAdvertisementResponse getAdvertisementById(@PathVariable Integer id) throws NotFoundException {
        return advertisementService.findAdvertisementById(id);
    }

    @PostMapping
    @ResponseBody
    public AdvertisementResponse createNew(Authentication authentication, @RequestBody CreateAdvertisementRequest newAdvertisement) throws NotFoundException {
        JwtUser user = (JwtUser) authentication.getPrincipal();
        return advertisementService.createNewAdvertisement(user.getId(), newAdvertisement);
    }

    @PutMapping
    @ResponseBody
    //TODO kako postaviti response status ako nije nesto dobro
    public OneAdvertisementResponse editAdvertisementById(Authentication authentication, @RequestBody EditAdvertisementRequest advertisementRequest) throws NotFoundException {
        JwtUser owner = (JwtUser) authentication.getPrincipal();
        return advertisementService.editAdvertisementById(owner.getId(),advertisementRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void deleteAdvertisementById(@PathVariable Integer id) throws NotFoundException {
        advertisementService.deleteAdvertisementById(id);
    }
}
