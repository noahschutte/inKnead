LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := in-knead
LOCAL_LDLIBS    := -llog

include $(BUILD_SHARED_LIBRARY)

# $(call import-module, boost/1.57.0)
