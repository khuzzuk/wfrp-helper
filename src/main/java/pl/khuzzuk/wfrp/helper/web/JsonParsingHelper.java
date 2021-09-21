package pl.khuzzuk.wfrp.helper.web;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("helper")
public class JsonParsingHelper {

    @ResponseBody
    @PostMapping(path = "{className}")
    public Object tryParse(@RequestBody String json, @PathVariable("className") String className) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            Class<?> requestedClass = Class.forName(className);
            return mapper.readValue(json, requestedClass);
        } catch (ClassNotFoundException | IOException e) {
            log.warn("Json parsing exception", e);
            return e;
        }
    }
}
